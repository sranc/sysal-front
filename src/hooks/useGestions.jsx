import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";

const useGestions = (staleTime = 5, cacheTime = 10) => {
  const queryClient = useQueryClient();

  staleTime = staleTime * 60 * 1000; // Convertir a milisegundos
  cacheTime = cacheTime * 60 * 1000;

  // Fetch de gestiones
  const { data, isLoading, error } = useQuery({
    queryKey: ["gestions"],
    queryFn: async () => {
      const response = await axios.get("/gestion");
      return response.data.data;
    },
    staleTime,
    cacheTime,
  });

  // Crear una nueva gestion
  const createGestion = useMutation({
    mutationFn: async (gestion) => {
      const response = await axios.post("/gestion", gestion);
      return response.data.data;
    },
    onSuccess: (newGestion) => {
      queryClient.setQueryData(["gestions"], (oldData) => [
        newGestion,
        ...(oldData || []),
      ]);
    },
    onError: (err) => {
      console.error("Error al crear gestión:", err);
    },
  });

  // Cerrar una gestión
  const closeGestion = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/gestion/${id}`);
      return response.status === 204 ? id : null;
    },
    onSuccess: (closedGestionId) => {
      queryClient.setQueryData(["gestions"], (oldData) =>
        oldData.map((gestion) =>
          gestion.id === closedGestionId
            ? { ...gestion, state: { value: 0, formatted: "Inactivo" } }
            : gestion
        )
      );
    },
    onError: (err) => {
      console.error("Error al cerrar la gestión:", err);
    },
  });

  return {
    data,
    isLoading,
    error,
    createGestion,
    closeGestion,
  };
};

export default useGestions;
