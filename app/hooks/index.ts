import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { persona } from "../utils/openai"


export type ActionError = {
    error: string
}

function isActionError(value: unknown): value is ActionError {
    return (
        typeof value === 'object' &&
        value !== null &&
        "error" in value &&
        typeof (value as ActionError).error === 'string'
    )
}


async function unwrapActionResult<T>(result: T | { error: string }): Promise<T> {
    if (isActionError(result)) {
        throw new Error(result.error)
    }
    return result
}

type PersonaInput = {
    channelName: string,
    tokens: string,
    systemPrompt: string
};

export const usePersona = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ channelName, tokens, systemPrompt }: PersonaInput) =>
            unwrapActionResult(persona(channelName, tokens, systemPrompt)),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["persona"] });
        },
    });
};