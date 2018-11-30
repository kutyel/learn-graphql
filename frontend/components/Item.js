import React from 'react'
import Link from 'next/link'

import fmt from '../lib/formatMoney'
import { Title, ItemStyles, PriceTag } from './styles'

export default ({ id, title, price, description, image }) => (
  <ItemStyles>
    {image && <img src={image} alt={title} />}
    <Title>
      <Link
        href={{
          pathname: '/item',
          query: { id },
        }}
      >
        <a>{title}</a>
      </Link>
    </Title>
    <PriceTag>{fmt(price)}</PriceTag>
    <p>{description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: '/update',
          query: { id },
        }}
      >
        <a>Edit ✏️</a>
      </Link>
      <button>Add to Cart</button>
      <button>Delete</button>
    </div>
  </ItemStyles>
)
