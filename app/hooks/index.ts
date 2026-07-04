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
    name: string;
    tokens: string;
};

export const usePersona = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ name, tokens }: PersonaInput) =>
            unwrapActionResult(persona(name, tokens)),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["persona"] });
        },
    });
};