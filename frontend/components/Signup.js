import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { Form } from './styles'
import Error from './ErrorMessage'
import { SIGNUP_MUTATION } from '../graphql/mutations'

const defaultState = {
  email: '',
  name: '',
  password: '',
}

export default class extends Component {
  state = defaultState
  onChange = ({ target: { name, value } }) => this.setState({ [name]: value })
  render = () => (
    <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault()
            await signup()
            this.setState(defaultState)
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign Up for an Account!</h2>
            <Error error={error} />
            <label htmtlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </label>
            <label htmtlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </label>
            <label htmtlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </label>
            <button type="submit">Sign Up!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  )
}
