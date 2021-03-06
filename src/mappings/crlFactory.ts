import { getFactory, getPair } from '../entities'

import { BIG_INT_ONE } from '../constants'
import { PairCreated } from '../types/CRLFactory/CRLFactory'
import { CRLPair as PairTemplate } from '../types/templates'

export function onPairCreated(event: PairCreated): void {
    const factory = getFactory()

    const pair = getPair(event.params.pair, event.block)

    // We returned null for some reason, we should silently bail without creating this pair
    if (!pair) {
        return
    }

    // Now it's safe to save
    pair.save()

    // create the tracked contract based on the template
    PairTemplate.create(event.params.pair)

    // Update pair count once we've sucessesfully created a pair
    factory.pairCount = factory.pairCount.plus(BIG_INT_ONE)
    factory.save()
}
