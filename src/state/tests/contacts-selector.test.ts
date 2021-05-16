import { contactsSelectorCombiner, IContact } from "../contacts-state";
import { createMockContact } from "./test-utils";

describe("Contacts Selector", () => {
  describe("when calling contactsSelectorCombiner", () => {
    let contactsList: IContact[];

    beforeEach(() => {
      contactsList = [
        createMockContact(1),
        createMockContact(2),
        createMockContact(3),
      ];
    });

    it("should return empty selected and unselected list for empty input collections", () => {
      const selectedIds: string[] = [];
      const contacts: IContact[] = [];

      expect(contactsSelectorCombiner(contacts, selectedIds)).toEqual({
        selectedContacts: [],
        unselectedContacts: [],
      });
    });

    it("should group selected and unselected contacts based on selected ids list", () => {
      const case1 = contactsSelectorCombiner(contactsList, ["2"]);
      expect(case1.selectedContacts).toEqual([createMockContact(2)]);
      expect(case1.unselectedContacts).toEqual([
        createMockContact(1),
        createMockContact(3),
      ]);

      const case2 = contactsSelectorCombiner(contactsList, ["1"]);
      expect(case2.selectedContacts).toEqual([createMockContact(1)]);
      expect(case2.unselectedContacts).toEqual([
        createMockContact(2),
        createMockContact(3),
      ]);

      const case3 = contactsSelectorCombiner(contactsList, ["1", "3"]);

      expect(case3.selectedContacts).toEqual([
        createMockContact(1),
        createMockContact(3),
      ]);
      expect(case3.unselectedContacts).toEqual([createMockContact(2)]);
    });

    it("should return all contacts as unselected when selected ids list is empty", () => {
      const { unselectedContacts, selectedContacts } = contactsSelectorCombiner(
        contactsList,
        []
      );
      expect(unselectedContacts).toEqual([
        createMockContact(1),
        createMockContact(2),
        createMockContact(3),
      ]);

      expect(selectedContacts).toEqual([]);
    });
  });
});
