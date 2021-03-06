import { atom, selector } from "recoil";

export const AvailableItemListAtom = atom({
  key: "availableItemList",
  default: [],
});

export const BoardConfigAtom = atom({
  key: "boardConfig",
  default: {},
});

export const BoardStateAtom = atom({
  key: "boardState",
  default: {
    movingItems: false,
    selecting: false,
    zooming: false,
    panning: false,
  },
});

export const ItemListAtom = atom({
  key: "itemList",
  default: [],
});

export const ItemMapAtom = atom({
  key: "ItemMap",
  default: {},
});

export const AllItemsSelector = selector({
  key: "AllItemsSelector",
  get: ({ get }) => {
    const itemMap = get(ItemMapAtom);
    return get(ItemListAtom)
      .map((id) => itemMap[id])
      .filter((item) => item); // This filter clean the selection of missing items
  },
});

export default {
  ItemListAtom,
  BoardConfigAtom,
  AvailableItemListAtom,
  AllItemsSelector,
  ItemMapAtom,
};
