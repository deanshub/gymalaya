import path from 'path'
import fs from 'fs-extra'
import { Plan } from './types'

export async function getPlan(username: string): Promise<Plan> {
    const plan: Plan = await fs.readJson(
        path.join(process.cwd(), `./data/${username}.json`),
    )
    return plan
}

export async function updatePlan(username: string, plan: Plan): Promise<Plan> {
    await fs.copy(
        path.join(process.cwd(), `./data/${username}.json`),
        path.join(process.cwd(), `./data/${username}.json.${Date.now()}.bkp`),
    )
    await fs.outputJson(
        path.join(process.cwd(), `./data/${username}.json`),
        plan,
        { spaces: 2 },
    )
    return plan
}
