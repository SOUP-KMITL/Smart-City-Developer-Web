import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default ({ services, match, linkPage }) => {
    const pages = [];
    if (pages.length < services.totalPages)
        for (let i = 1; i <= services.totalPages; i++)
            pages.push(i);

    if (services.length != 0)
        return (
            <Pagination>
                <PaginationItem disabled={ services.first }>
                    {
                        services.first
                        ? <Link
                            to={`${linkPage}${match.params.page - 1}`}
                            onClick={ e => e.preventDefault() }
                        >
                            <PaginationLink previous />
                        </Link>
                        : <Link
                            to={`${linkPage}${match.params.page - 1}`}
                        >
                            <PaginationLink previous />
                        </Link>
                    }
                </PaginationItem>
                {
                    pages.map((page, i) => (
                        <PaginationItem key={i}>
                            <Link to={`${linkPage}${page}`}>
                                <PaginationLink>
                                    { page }
                                </PaginationLink>
                            </Link>
                        </PaginationItem>
                    ))
                }
                <PaginationItem disabled={ services.last }>
                    {
                        services.last
                        ? <Link
                            to={`${linkPage}${+match.params.page + 1}`}
                            onClick={e => e.preventDefault()}
                        >
                            <PaginationLink next />
                        </Link>
                        : <Link
                            to={`${linkPage}${+match.params.page + 1}`}
                        >
                            <PaginationLink next />
                        </Link>
                    }
                </PaginationItem>
            </Pagination>
        )
    else
        return null;
}
