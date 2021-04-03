import { Address, ethereum } from '@graphprotocol/graph-ts'
import { BIG_DECIMAL_ZERO, BIG_INT_ZERO, FACTORY_ADDRESS } from '../constants'
import { DayData, CRLFactory } from '../types/schema'

export function getFactory(id: Address = FACTORY_ADDRESS): CRLFactory {
    let factory = CRLFactory.load(id.toHex())

    if (factory === null) {
        factory = new CRLFactory(id.toHex())
        factory.volumeBNB = BIG_DECIMAL_ZERO
        factory.volumeUSD = BIG_DECIMAL_ZERO
        factory.untrackedVolumeUSD = BIG_DECIMAL_ZERO
        factory.liquidityBNB = BIG_DECIMAL_ZERO
        factory.liquidityUSD = BIG_DECIMAL_ZERO
        factory.pairCount = BIG_INT_ZERO
        factory.txCount = BIG_INT_ZERO
        factory.tokenCount = BIG_INT_ZERO
        factory.userCount = BIG_INT_ZERO
        factory.save()
    }

    return factory as CRLFactory
}

export function getDayData(event: ethereum.Event): DayData {
    const id = event.block.timestamp.toI32() / 86400

    let dayData = DayData.load(id.toString())

    if (dayData === null) {
        const factory = getFactory()
        dayData = new DayData(id.toString())
        dayData.factory = factory.id
        dayData.date = id * 86400
        dayData.volumeUSD = BIG_DECIMAL_ZERO
        dayData.volumeBNB = BIG_DECIMAL_ZERO
        dayData.untrackedVolume = BIG_DECIMAL_ZERO
        dayData.liquidityUSD = factory.liquidityUSD
        dayData.liquidityBNB = factory.liquidityBNB
        dayData.txCount = factory.txCount
    }

    return dayData as DayData
}

export function updateDayData(event: ethereum.Event): DayData {
    const factory = getFactory()

    const dayData = getDayData(event)

    dayData.liquidityUSD = factory.liquidityUSD
    dayData.liquidityBNB = factory.liquidityBNB
    dayData.txCount = factory.txCount

    dayData.save()

    return dayData as DayData
}
