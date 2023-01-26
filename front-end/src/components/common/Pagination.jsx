import { useEffect } from 'react'
import styled from 'styled-components'

export default ({ page, totalCount, perPage, onPaginationChange }) => {
  const showPeriod = 4
  const totalPage = Math.ceil(totalCount / perPage)

  const startPage = Math.max(1, page - showPeriod, totalPage - showPeriod)
  const lastPage = Math.min(page + showPeriod, totalPage)

  const pageSize = lastPage - startPage + 1
  const pageArray = Array.from(Array(pageSize).keys()).map((v) => v + startPage)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const onClickHandler = (page) => (e) => {
    e.preventDefault()
    onPaginationChange(page)
  }

  const onClickPrevHandler = (e) => {
    e.preventDefault()
    if (page <= 1) return

    onPaginationChange(page - 1)
  }

  const onClickNextHandler = (e) => {
    e.preventDefault()
    if (page >= pageArray.length) return

    onPaginationChange(page + 1)
  }

  return (
    <div className="paging">
      <a href="#" class="pre" onClick={onClickPrevHandler}>«</a>
      {pageArray.map((v, i) => {
        if (v === page) {
          return <ActivePagination>{v}</ActivePagination>
        } else {
          return (
            <a
              href="#"
              class={i.length === pageArray.length ? 'last-child' : ''}
              onClick={onClickHandler(v)}
            >
              {v}
            </a>
          )
        }
      })}
      <a href="#" onClick={onClickNextHandler}>
        »
      </a>
    </div>
  )
}

const ActivePagination = styled.strong`
  color: ${(props) => props.theme.colors.point};
`
