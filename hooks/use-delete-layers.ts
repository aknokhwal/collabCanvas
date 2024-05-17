import { useSelf, useMutation } from "@/liveblocks.config";

export const useDeleteLayers = () => {
  const selection = useSelf((me) => me.presence.selection);

  console.log("Selections -->");
  console.log(selection);

  return useMutation((
    { storage, setMyPresence }
  ) => {
    const liveLayers = storage.get("layers");
    console.log("liveLayers -->");
    console.log(liveLayers);
    const liveLayerIds = storage.get("layerIds");
    console.log("liveLayerIds -->");
    console.log(liveLayerIds);

    for (const id of selection) {
      liveLayers.delete(id);

      const index = liveLayerIds.indexOf(id);

      if (index !== -1) {
        liveLayerIds.delete(index);
      }
    }

    setMyPresence({ selection: [] }, { addToHistory: true });
  }, [selection]);
};