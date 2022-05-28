import mongoose from "mongoose";

const DailyActivityDataSchema = new mongoose.Schema({
    email:  { type: String, default:"jai.singh3705@gmail.com", required: true},
    field1Value: { type: String, default: ""},
    field2Value: { type: String, default: ""},
    field3Value: { type: String, default: ""},
    field4Value: { type: String, default: ""},
    field5Value: { type: String, default: ""},
    field6Value: { type: String, default: ""},
    field7Value: { type: String, default: ""},
    field8Value: { type: String, default: ""},
    field9Value: { type: String, default: ""},
    field10Value: { type: String, default: ""},
    field11Value: { type: String, default: ""},
    field12Value: { type: String, default: ""},
    field13Value: { type: String, default: ""},
    field14Value: { type: String, default: ""},
    field15Value: { type: String, default: ""},
    field16Value: { type: String, default: ""},
    field17Value: { type: String, default: ""},
    field18Value: { type: String, default: ""},
    field19Value: { type: String, default: ""},
    field20Value: { type: String, default: ""},
    dependentValue: { type: String, default: ""},
    recordDate: { type: Date, default: Date.now}
});

DailyActivityDataSchema.index({'email': 1, 'recordDate': 1}, {unique: true});

const dailyactivitydata = mongoose.models.dailyactivitydata || mongoose.model("dailyactivitydata", DailyActivityDataSchema);
export default dailyactivitydata;
