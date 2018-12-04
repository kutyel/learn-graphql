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
  uploadFile = async e => {
    const { files } = e.target
    const body = new FormData()
    body.append('file', files[0])
    body.append('upload_preset', 'sickfits')
    const res = await fetch('https://api.cloudinary.com/v1_1/kutyel/image/upload', {
      method: 'POST',
      body,
    })
    const {
      secure_url: image,
      eager: [{ secure_url: largeImage }],
    } = await res.json()
    this.setState({ image, largeImage })
  }
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
            <label htmlFor="file">
              Image
              <input
                type="file"
                name="file"
                id="file"
                placeholder="Upload an Image"
                required
                onChange={this.uploadFile}
              />
              {this.state.image && <img src={this.state.image} alt="Upload Preview" />}
            </label>
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
