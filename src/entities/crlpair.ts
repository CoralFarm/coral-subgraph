import { Address, ethereum } from '@graphprotocol/graph-ts'
import { BIG_DECIMAL_ZERO, BIG_INT_ZERO, FACTORY_ADDRESS } from '../constants'

import { CRLPair } from '../types/schema'
import { CRLPair as PairContract } from '../types/templates/CRLPair/CRLPair'
import { getToken } from './token'

export function getPair(address: Address, block: ethereum.Block = null): CRLPair | null {
    let pair = CRLPair.load(address.toHex())

    if (pair === null) {
        const pairContract = PairContract.bind(address)

        const token0 = getToken(pairContract.token0())

        if (token0 === null) {
            return null
        }

        const token1 = getToken(pairContract.token1())

        if (token1 === null) {
            return null
        }

        pair = new CRLPair(address.toHex())
        pair.factory = FACTORY_ADDRESS.toHex()

        pair.name = token0.symbol.concat('-').concat(token1.symbol)

        pair.token0 = token0.id
        pair.token1 = token1.id
        pair.liquidityProviderCount = BIG_INT_ZERO

        pair.txCount = BIG_INT_ZERO
        pair.reserve0 = BIG_DECIMAL_ZERO
        pair.reserve1 = BIG_DECIMAL_ZERO
        pair.trackedReserveBNB = BIG_DECIMAL_ZERO
        pair.reserveBNB = BIG_DECIMAL_ZERO
        pair.reserveUSD = BIG_DECIMAL_ZERO
        pair.totalSupply = BIG_DECIMAL_ZERO
        pair.volumeToken0 = BIG_DECIMAL_ZERO
        pair.volumeToken1 = BIG_DECIMAL_ZERO
        pair.volumeUSD = BIG_DECIMAL_ZERO
        pair.untrackedVolumeUSD = BIG_DECIMAL_ZERO
        pair.token0Price = BIG_DECIMAL_ZERO
        pair.token1Price = BIG_DECIMAL_ZERO

        pair.timestamp = block.timestamp
        pair.block = block.number
    }

    return pair as CRLPair
}
