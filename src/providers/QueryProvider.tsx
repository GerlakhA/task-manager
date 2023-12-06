'use client'

interface IQueryProvider {
	children: React.ReactNode
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, useState } from 'react'

const QueryProvider: FC<IQueryProvider> = ({ children }) => {
	const [client] = useState(() => new QueryClient())
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default QueryProvider
