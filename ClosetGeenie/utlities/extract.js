module.exports = {
    SynonymValue: (slt, evt) => {
        return evt
            .request
            .intent
            .slots[slt]
            .resolutions
            .resolutionsPerAuthority[0]
            .values[0]
            .value
            .name;
    }
};