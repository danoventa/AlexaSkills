module.exports = {
    SentenceFromArray: (arrayOfItems) => {
        let prettyWords = ``;
        const arrayLength = arrayOfItems.length;
        if (arrayLength > 1) {
            const lastIndex = arrayLength - 1;
            for (let i = 0; i <= lastIndex; i++) {

                prettyWords += (i === lastIndex)
                    ? `<s>and <emphasis level="reduced">${arrayOfItems[lastIndex]}</emphasis></s>`
                    : `<s><emphasis level="reduced">${arrayOfItems[i]}</emphasis>,</s> `;
            }
        } else if (arrayLength > 0) {
            prettyWords += arrayOfItems[0];
        }

        return prettyWords;
    },
    ExplanationFromArray: (arrayOfItems) => {
        let exampleList = ``;
        const arrayLength = arrayOfItems.length;
        if (arrayLength > 1) {
            const lastIndex = arrayLength - 1;
            for (let i = 0; i <= lastIndex; i++) {

                exampleList += (i === lastIndex)
                    ? `<s>or "Alexa, tell me about <emphasis level="reduced">${arrayOfItems[lastIndex]}</emphasis>"</s>`
                    : `<s>"Alexa, tell me about <emphasis level="reduced">${arrayOfItems[i]}</emphasis>",</s> `;
            }
        } else if (arrayLength > 0) {
            exampleList += `<s>"Alexa, tell me about <emphasis level="reduced">${arrayOfItems[0]}</emphasis>"</s>`;
        }

        return exampleList;
    }
};