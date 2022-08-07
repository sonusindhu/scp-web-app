interface EmailListProps{
    emails: Email[]
}

interface Email {
    companyId: number,
    contactId: number,
    createdAt: number,
    id: number,
    inventoryId: number,
    isCritical: boolean,
    message: string,
    quoteId: number,
    title: string,
    type: string
    updatedAt: number,
    userId: number
}

export {
    EmailListProps,
    Email
}