define(["require", "exports", "../flux/action"], function (require, exports, action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemActions {
    }
    ItemActions.itemAdded = new action_1.Action();
    ItemActions.fieldValueChanged = new action_1.Action();
    ItemActions.propertyValueChanged = new action_1.Action();
    ItemActions.itemsSaved = new action_1.Action();
    ItemActions.itemsReset = new action_1.Action();
    exports.ItemActions = ItemActions;
});
