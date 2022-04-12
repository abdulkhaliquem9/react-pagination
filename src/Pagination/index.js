import React, { useEffect, useState } from 'react'
import './style.css'
function Pagination({recordsPerPage = 60, totalRecords=1000, maxButtonsToShow = 5}) {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [visibleButtons, setVisibleButtons] = useState([])
    useEffect(() => {
        if (totalRecords > 0) {
            const totalPagesCount = Math.ceil(totalRecords / recordsPerPage)
            setTotalPages(totalPagesCount)
            if (totalRecords > 0) {
                setCurrentPage(1)
            }
            const pagesLength = totalPagesCount
            const pageButtons = []
            if(pagesLength <= maxButtonsToShow ){
                for(let i = 1; i<=pagesLength; i++)
                {
                    pageButtons.push(i)
                }
                setVisibleButtons(pageButtons)
            }else{
                for(let i = 1; i<=maxButtonsToShow; i++)
                {
                    pageButtons.push(i)
                }
                setVisibleButtons(pageButtons)
            }
        }
    }, [])
    // console.log('data', visibleButtons)
    const onNext = () => {
        let pageButtons = [...visibleButtons]
        const buttonsCount = totalPages
        const lastPageButtonNumber = (visibleButtons[visibleButtons.length-1])
        if(currentPage < buttonsCount){
            setCurrentPage(currentPage+1)
            if(lastPageButtonNumber < buttonsCount){
            pageButtons.splice(0,1)
            pageButtons = [...pageButtons,lastPageButtonNumber+1]
            setVisibleButtons(pageButtons)
            }
        }
    }
    const onPrev = () => {
        let pageButtons = [...visibleButtons]
        const buttonsCount = totalPages
        const leastPageButtonNumber = (visibleButtons[0])
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
             if(leastPageButtonNumber < buttonsCount && (pageButtons[0]) >= 0 && (currentPage) === (pageButtons[0])){
            pageButtons.splice(pageButtons.length-1,1)
            pageButtons = [leastPageButtonNumber-1, ...pageButtons,]
            setVisibleButtons(pageButtons)
            }
        }
    }
    return (
        <div className='pagination'>
            <div>
                <button onClick={onPrev}>{"<"}</button>
                {
                    visibleButtons.map((el, i) => <button key={el}
                        className={currentPage === el ? 'active-button' : 'inactive-button'}
                        onClick={() => { setCurrentPage(el) }}
                    >                        
                    {el}
                    </button>)
                }
                <button onClick={onNext}>{">"}</button>
            </div>
        </div>
    )
}

export default Pagination