import React, { Component } from "react";
import { Rate, Dialog, Form, Input, Button, Select, Message } from 'element-react';
import { Wishlist } from "../helpers/Fetcher";

class WishlistAdd extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isVisible: false,
            wishlists: null,
            form: {}
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.product && nextProps.user) 
        {
            this.setState({ 
                isVisible: true, 
                form: { 
                    product: nextProps.product, 
                    user: nextProps.user._id 
                } 
            });
        }
    }

    componentDidMount()
    {
        Wishlist.options(this.props.user._id)
        .then(result => result.json())
        .then(json => this.setState({ wishlists: json.result }))
        .catch(err => console.log(err));
    }

    onChange(name, value)
    {
        let { form } = this.state;
        form[name] = value;

        this.setState({ form: form });
    }

    onSubmit()
    {
        Wishlist.add(this.state.form)
            .then(result => result.json())
            .then(json => { 
                Message.success(json.result); 
                this.props.onSuccess(); 
                this.setState({ isVisible: false }); 
            })
            .catch(err => Message.error("Cannot add product to wishlist."));
    }

    onCancel() {
        this.props.onCancel();
        this.setState({ form: {}, isVisible: false });
    }

    render()
    {
        let { state } = this;

        return <Dialog
            title="Ask as gift"
            visible={state.isVisible}
            lockScroll={true}
            size="large"
            onCancel={this.onCancel.bind(this)}
        >
            <Dialog.Body>
                <Form labelPosition="top">
                    <Form.Item label="Wishlist">
                        <Select 
                            placeholder="Search for a list.." 
                            onChange={this.onChange.bind(this, "wishlist")}
                            disabled={state.wishlists===null}
                        >
                            {state.wishlists && state.wishlists.map(wl => 
                                <Select.Option key={wl._id} value={wl._id} label={wl.name} />)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Price">
                        <Input prepend="R$" type="number" placeholder="Numbers only." onChange={this.onChange.bind(this, "price")} />
                    </Form.Item>

                    <Form.Item label="You want this because..">
                    <Rate
                        showText={true}
                        texts={['I wish', 'I want', 'I need', 'I neeeed', 'I LOVE IT']}
                        onChange={this.onChange.bind(this, "love")} 
                    />
                    </Form.Item>
                </Form>
            </Dialog.Body>

            <Dialog.Footer className="dialog-footer">
                <Button onClick={this.onCancel.bind(this)}>Cancelar</Button>
                <Button type="primary" onClick={this.onSubmit.bind(this)}>Salvar</Button>
            </Dialog.Footer>
        </Dialog>;
    }
}

export default WishlistAdd;