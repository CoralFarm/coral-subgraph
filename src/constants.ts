import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')

export const BIG_DECIMAL_1E6 = BigDecimal.fromString('1e6')

export const BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export const BIG_DECIMAL_1E18 = BigDecimal.fromString('1e18')

export const BIG_DECIMAL_ZERO = BigDecimal.fromString('0')

export const BIG_DECIMAL_ONE = BigDecimal.fromString('1')

export const BIG_INT_ONE = BigInt.fromI32(1)

export const BIG_INT_ONE_DAY_SECONDS = BigInt.fromI32(86400)

export const BIG_INT_ZERO = BigInt.fromI32(0)

export const FACTORY_ADDRESS = Address.fromString('0x8033ae5E0bfCE8C30461dc0a13b65C07c7667F66')

export const NULL_CALL_RESULT_VALUE = '0x0000000000000000000000000000000000000000000000000000000000000001'

export const DAI_WBNB_PAIR = '0x8aafe6402bba0af9f8ce2e7eb00aeb4e8021e88e'// created block 6205919
export const USDT_WBNB_PAIR = '0x18423af15ee68da3d57d07a7cc8529bd16cd29a2'// created block 6205871
export const WBNB_BUSD_PAIR = '0xe14fd45fcefb20180a2720615caa8d9f306e9e20'// created block 6108298

export const CRL_BUSD_PAIR = '0xa0d0933a35b7d1446d7884546f33a14dfecdb016'// created block 6092620

export const WHITELIST: string[] = [
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
    '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
    '0x55d398326f99059ff775485246999027b3197955', // USDT
    '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
    '0x23396cf899ca06c4472205fc903bdb4de249d6fc', // UST
    '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI
    '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7', // VAI
    '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', // BTCB
    '0x2170ed0880ac9a755fd29b2688956bd959f933f8', // WETH
    '0x250632378e573c6be1ac2f97fcdf00515d0aa91b', // BETH
    '0xc00b1ffa922edf1175a4e6feaac5b2b469932524', // CRL
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('0')

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_BNB = BigDecimal.fromString('0')

export const WBNB_ADDRESS = Address.fromString('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
