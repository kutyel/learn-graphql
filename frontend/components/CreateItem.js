import gql from 'graphql-tag'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import React, { Component } from 'react'

import { Form } from './styles'
import Error from './ErrorMessage'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

export default class extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }
  handleChange = ({ target: { type, name, value } }) =>
    this.setState({ [name]: type === 'number' ? +value : value })
  render = () => (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {(createItem, { loading, error }) => (
        <Form
          onSubmit={async e => {
            e.preventDefault()
            const {
              data: {
                createItem: { id },
              },
            } = await createItem()
            Router.push({
              pathname: '/item',
              query: { id },
            })
          }}
        >
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="price">
              Price
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                required
                value={this.state.price}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                name="description"
                id="description"
                placeholder="Enter a description"
                required
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Mutation>
  )
}
