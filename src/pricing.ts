import {
    ADDRESS_ZERO,
    BIG_DECIMAL_1E18,
    BIG_DECIMAL_ONE,
    BIG_DECIMAL_ZERO,
    DAI_WBNB_PAIR,
    FACTORY_ADDRESS,
    MINIMUM_LIQUIDITY_THRESHOLD_BNB,
    CRL_BUSD_PAIR,
    USDT_WBNB_PAIR,
    WBNB_BUSD_PAIR,
    WBNB_ADDRESS,
    WHITELIST,
} from './constants'
import { Address, BigDecimal, BigInt, ethereum, log } from '@graphprotocol/graph-ts'
import { CRLPair, Token } from '../src/types/schema'

import { CRLFactory as FactoryContract } from '../src/types/templates/CRLPair/CRLFactory'
import { CRLPair as PairContract } from '../src/types/templates/CRLPair/CRLPair'

export const factoryContract = FactoryContract.bind(FACTORY_ADDRESS)

export function getCRLPrice(): BigDecimal {
    const pair = CRLPair.load(CRL_BUSD_PAIR)

    if (pair) {
        return pair.token1Price
    }

    return BIG_DECIMAL_ZERO
}

export function getBNBPrice(block: ethereum.Block = null): BigDecimal {
    // fetch eth prices for each stablecoin
    const daiPair = CRLPair.load(DAI_WBNB_PAIR) // dai is token0 / bnb token 1

    const usdtPair = CRLPair.load(USDT_WBNB_PAIR) // usdt is token0 / bnb is token1

    const busdPair = CRLPair.load(WBNB_BUSD_PAIR) // busd is token1 / bnb is token0

    // all 3 have been created, get the weighted average of them
    if (daiPair !== null && usdtPair !== null && busdPair !== null) {
        const totalLiquidityBNB = daiPair.reserve1.plus(usdtPair.reserve1).plus(busdPair.reserve0)
        const daiWeight = daiPair.reserve1.div(totalLiquidityBNB)
        const usdtWeight = usdtPair.reserve1.div(totalLiquidityBNB)
        const busdWeight = busdPair.reserve0.div(totalLiquidityBNB)
        return daiPair.token0Price
            .times(daiWeight)
            .plus(usdtPair.token0Price.times(usdtWeight))
            .plus(busdPair.token1Price.times(busdWeight))
        // dai and USDC have been created
    } else if (busdPair !== null && usdtPair !== null) {
        const totalLiquidityBNB = busdPair.reserve0.plus(usdtPair.reserve1)
        const busdWeight = busdPair.reserve0.div(totalLiquidityBNB)
        const usdcWeight = usdtPair.reserve1.div(totalLiquidityBNB)
        return busdPair.token1Price.times(busdWeight).plus(usdtPair.token0Price.times(usdcWeight))
        // USDC is the only pair so far
    } else if (busdPair !== null) {
        return busdPair.token1Price
    } else {
        log.warning('No bnb pair...', [])
        return BIG_DECIMAL_ZERO
    }
}

export function findBNBPerToken(token: Token): BigDecimal {
    if (Address.fromString(token.id) == WBNB_ADDRESS) {
        return BIG_DECIMAL_ONE
    }

    // loop through whitelist and check if paired with any

    // TODO: This is slow, and this function is called quite often.
    // What could we do to improve this?
    for (let i = 0; i < WHITELIST.length; ++i) {
        // TODO: Cont. This would be a good start, by avoiding multiple calls to getPair...
        const pairAddress = factoryContract.getPair(Address.fromString(token.id), Address.fromString(WHITELIST[i]))
        if (pairAddress != ADDRESS_ZERO) {
            const pair = CRLPair.load(pairAddress.toHex())
            if (pair.token0 == token.id) {
                const token1 = Token.load(pair.token1)
                return pair.token1Price.times(token1.derivedBNB as BigDecimal) // return token1 per our token * Eth per token 1
            }
            if (pair.token1 == token.id) {
                const token0 = Token.load(pair.token0)
                return pair.token0Price.times(token0.derivedBNB as BigDecimal) // return token0 per our token * BNB per token 0
            }
        }
    }

    return BIG_DECIMAL_ZERO // nothing was found return 0
}
