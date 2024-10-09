import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";

const useFinancing = (staleTime = 10, cacheTime = 20) => {
  const queryClient = useQueryClient();

  staleTime = staleTime * 60 * 1000;
  cacheTime = cacheTime * 60 * 1000;

  // Actualización para React Query v5: ahora usamos un objeto para la configuración de useQuery
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["financing"],
    queryFn: async () => {
      const response = await axios.get("/financing");
      return response.data.data;
    },
    staleTime,
    cacheTime,
  });

  // Actualización para React Query v5: ahora usamos un objeto para la configuración de useMutation
  const createFinancing = useMutation({
    mutationFn: async (financing) => {
      const response = await axios.post("/financing", financing);
      return response.data.data;
    },
    onSuccess: (newData) => {
      // Actualiza la caché directamente con el nuevo dato
      queryClient.setQueryData(["financing"], (oldData) => [
        ...oldData,
        newData,
      ]);
    },
    onError: (err) => {
      console.error("Error al crear financiamiento:", err);
    },
  });

  const updateFinancing = useMutation({
    mutationFn: async (financing) => {
      const response = await axios.put(`/financing/${financing.id}`, financing);
      return response.data.data;
    },
    onSuccess: (updatedData) => {
      // Actualiza la caché con el dato modificado
      queryClient.setQueryData(["financing"], (oldData) =>
        oldData.map((item) => (item.id === updatedData.id ? updatedData : item))
      );
    },
    onError: (err) => {
      console.error("Error al actualizar financiamiento:", err);
    },
  });

  const deleteFinancing = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/financing/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      // Elimina el dato de la caché
      queryClient.setQueryData(["financing"], (oldData) =>
        oldData.filter((item) => item.id !== deletedId)
      );
    },
    onError: (err) => {
      console.error("Error al eliminar financiamiento:", err);
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    createFinancing,
    updateFinancing,
    deleteFinancing,
  };
};

export default useFinancing;
