
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useEnlistmentDates() {
  return useQuery({
    queryKey: ["enlistment-dates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enlistment_dates")
        .select("*")
        .order("year", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}
