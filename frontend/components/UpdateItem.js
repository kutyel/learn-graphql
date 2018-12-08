import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'

import { Form } from './styles'
import Error from './ErrorMessage'
import { SINGLE_ITEM_QUERY } from '../graphql/queries'
import { UPDATE_ITEM_MUTATION } from '../graphql/mutations'

export default class extends Component {
  state = {}
  handleChange = ({ target: { type, name, value } }) =>
    this.setState({ [name]: type === 'number' ? +value : value })
  updateItem = async (e, mutation) => {
    e.preventDefault()
    await mutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    })
  }
  render = () => (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
      {({ data, loading }) =>
        loading ? (
          <span>Loading...</span>
        ) : !data.item ? (
          <span>Item not found :(</span>
        ) : (
          <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
            {(updateItem, { loading, error }) => (
              <Form onSubmit={e => this.updateItem(e, updateItem)}>
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
                      defaultValue={data.item.title}
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
                      defaultValue={data.item.price}
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
                      defaultValue={data.item.description}
                      onChange={this.handleChange}
                    />
                  </label>
                </fieldset>
                <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
              </Form>
            )}
          </Mutation>
        )
      }
    </Query>
  )
}
