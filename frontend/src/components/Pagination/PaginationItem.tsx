import React from 'react';
import { Content } from "./styles";

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
    onPageChange: (page: number) => void;
}
export function PaginationItem({
    isCurrent = false, 
    onPageChange,
    number 
}: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Content>
                <button>
                    {number}
                </button>
            </Content>
        );
    }

    return (
        <Content>
            <button>
                {number}
            </button>
        </Content>
    );
}