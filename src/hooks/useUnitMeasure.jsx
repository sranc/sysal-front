import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";

const useUnitMeasure = (staleTime = 5, cacheTime = 10) => {
  const queryClient = useQueryClient();

  staleTime = staleTime * 60 * 1000; // Convierte a milisegundos
  cacheTime = cacheTime * 60 * 1000; // Convierte a milisegundos

  // Fetch de las unidades de medida
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["unitMeasures"],
    queryFn: async () => {
      const response = await axios.get("/unitMeasure");
      return response.data.data;
    },
    staleTime,
    cacheTime,
  });

  // Crear nueva unidad de medida
  const createUnitMeasure = useMutation({
    mutationFn: async (unitMeasure) => {
      const response = await axios.post("/unitMeasure", unitMeasure);
      return response.data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["unitMeasures"], (oldData) => [
        ...oldData,
        newData,
      ]);
    },
    onError: (err) => {
      console.error("Error al crear la unidad de medida:", err);
    },
  });

  // Actualizar unidad de medida
  const updateUnitMeasure = useMutation({
    mutationFn: async (unitMeasure) => {
      const response = await axios.put(
        `/unitMeasure/${unitMeasure.id}`,
        unitMeasure
      );
      return response.data.data;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["unitMeasures"], (oldData) =>
        oldData.map((item) => (item.id === updatedData.id ? updatedData : item))
      );
    },
    onError: (err) => {
      console.error("Error al actualizar la unidad de medida:", err);
    },
  });

  // Eliminar unidad de medida
  const deleteUnitMeasure = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/unitMeasure/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["unitMeasures"], (oldData) =>
        oldData.filter((item) => item.id !== deletedId)
      );
    },
    onError: (err) => {
      console.error("Error al eliminar la unidad de medida:", err);
    },
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    createUnitMeasure,
    updateUnitMeasure,
    deleteUnitMeasure,
  };
};

export default useUnitMeasure;
