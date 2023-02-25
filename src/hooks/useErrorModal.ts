import { useState } from 'react';
export function useErrorModal() {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    return [isOpen,setIsOpen]
}