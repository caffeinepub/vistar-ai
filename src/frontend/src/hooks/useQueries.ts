import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useWaitlistCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["waitlistCount"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getTotalWaitlistCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitWaitlist() {
  const { actor } = useActor();
  return useMutation<bigint, Error, string>({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitEmail(email);
    },
  });
}
