import { BIG_DECIMAL_ZERO } from '../constants'
import { BigDecimal } from '@graphprotocol/graph-ts'
import { Bundle } from '../types/schema'

export function getBundle(): Bundle {
    let bundle = Bundle.load('1')

    if (bundle === null) {
        bundle = new Bundle('1')
        bundle.bnbPrice = BIG_DECIMAL_ZERO
        bundle.save()
    }

    return bundle as Bundle
}
