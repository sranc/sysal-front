import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";

const useCrudQuery = (queryKey, apiUrl, staleTime = 5, cacheTime = 10) => {
  const queryClient = useQueryClient();

  staleTime = staleTime * 60 * 1000; // Convertir a milisegundos
  cacheTime = cacheTime * 60 * 1000;

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(apiUrl);
      return response.data.data;
    },
    staleTime,
    cacheTime,
  });

  const createData = useMutation({
    mutationFn: async (newData) => {
      const response = await axios.post(apiUrl, newData);
      return response.data.data;
    },
    onSuccess: (createdData) => {
      queryClient.setQueryData([queryKey], (oldData) => [
        ...oldData,
        createdData,
      ]);
    },
    onError: (err) => {
      console.error("Error al crear:", err);
    },
  });

  const updateData = useMutation({
    mutationFn: async (updatedData) => {
      const response = await axios.put(
        `${apiUrl}/${updatedData.id}`,
        updatedData
      );
      return response.data.data;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData([queryKey], (oldData) =>
        oldData.map((item) => (item.id === updatedData.id ? updatedData : item))
      );
    },
    onError: (err) => {
      console.error("Error al actualizar:", err);
    },
  });

  const deleteData = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.status === 204 ? id : null;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData([queryKey], (oldData) =>
        oldData.filter((item) => item.id !== deletedId)
      );
    },
    onError: (err) => {
      console.error("Error al eliminar:", err);
    },
  });

  const closeData = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.status === 204 ? id : null;
    },
    onSuccess: (closedGestionId) => {
      queryClient.setQueryData([queryKey], (oldData) =>
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
    createData,
    updateData,
    deleteData,
    closeData,
  };
};

export default useCrudQuery;
