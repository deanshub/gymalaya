import { NextApiRequest, NextApiResponse } from 'next'
import { reorder } from '../../data/utils'
import { updatePlan, getPlan } from '../../data/plan'
import { serve } from '../../apiRouter/serve'

async function patchPlan(
    username: string,
    program: number,
    startIndex: number,
    endIndex: number,
) {
    const plan = await getPlan(username)
    const reorderedExercises = reorder(
        plan[program].exercises,
        startIndex,
        endIndex,
    )
    const reorderedPlan = plan
    reorderedPlan[program].exercises = reorderedExercises
    return await updatePlan(username, reorderedPlan)
}

export default serve('/api/plan', async ({ body }) => {
    const plan = await patchPlan(
        body.username,
        body.program,
        body.startIndex,
        body.endIndex,
    )
    return plan
})
