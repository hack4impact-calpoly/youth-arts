import React from "react"

function Pagination(props) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{margin: "auto"}} className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a style={{color: "blue"}} onClick={() => props.paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination