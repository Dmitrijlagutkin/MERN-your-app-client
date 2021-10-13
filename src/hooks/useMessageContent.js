export const useMessageContent = (messageName, data, clientUrl) => {
    switch (messageName) {
        case "telegram":
            const shareUrlTelegram= `
            **${data.listTitle}** 
            ${data.date} 
            category: __${data.category}__ `
            
            const titleTelegram = data?.listItem.map((item, index) => {
                return (
                `
                ${index + 1}. ${item.itemName}` 
                )
            }) 
            return {shareUrlTelegram, titleTelegram}

        case "whatsapp":
            const shareUrlWhatsApp= `*${data.listTitle}* 
            ${data.date} 
            category: _${data.category}_ `

            const titleWhatsApp = data?.listItem.map((item, index) => {
                return (
                `
                ${index + 1}. ${item.itemName}` 
                )
            }) 
            return {shareUrlWhatsApp, titleWhatsApp}
        
        case "email":
            const bodyEmail = `${data.listTitle} 
            ${data.date} 
            category: ${data.category} 
            back to: ${clientUrl}
            `
            
            const textEmail = data?.listItem.map((item, index) => {
                return (
                `
                ${index + 1}. ${item.itemName}` 
                ) 
            })

            const subjectEmail = `Your List: ${data.listTitle}`

            return {bodyEmail, textEmail, subjectEmail}
    }
}