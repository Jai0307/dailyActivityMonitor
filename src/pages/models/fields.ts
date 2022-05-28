import mongoose from "mongoose";

const FieldsSchema = new mongoose.Schema({
    email:  { type: String, default:"jai.singh3705@gmail.com", required: true, unique: true},
    field1Name: { type: String, default: ""},
    field2Name: { type: String, default: ""},
    field3Name: { type: String, default: ""},
    field4Name: { type: String, default: ""},
    field5Name: { type: String, default: ""},
    field6Name: { type: String, default: ""},
    field7Name: { type: String, default: ""},
    field8Name: { type: String, default: ""},
    field9Name: { type: String, default: ""},
    field10Name: { type: String, default: ""},
    field11Name: { type: String, default: ""},
    field12Name: { type: String, default: ""},
    field13Name: { type: String, default: ""},
    field14Name: { type: String, default: ""},
    field15Name: { type: String, default: ""},
    field16Name: { type: String, default: ""},
    field17Name: { type: String, default: ""},
    field18Name: { type: String, default: ""},
    field19Name: { type: String, default: ""},
    field20Name: { type: String, default: ""},
    dependent: { type: String, default: ""},
});

const fields = mongoose.models.fields || mongoose.model("fields", FieldsSchema);
export default fields;
