import React, { Component } from "react";
import { Rate, Dialog, Form, Input, Button, AutoComplete } from 'element-react';

class WishlistAdd extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isVisible: true,
            form: {}
        }
    }

    onChange(name, value)
    {
        let { form } = this.state;
        form[name] = value;

        this.setState({ form: form });
    }

    onCancel() {
        this.setState({ form: {}, isVisible: false });
    }

    querySearchAsync(queryString, callback)
    {
        console.log(queryString);
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
                    <Form.Item label="Withlist name">
                        <AutoComplete 
                            placeholder="Search for a list.."
                            fetchSuggestions={this.querySearchAsync.bind(this)}
                        />
                    </Form.Item>

                    <Form.Item label="Price">
                        <Input prepend="R$" type="number" placeholder="Numbers only." />
                    </Form.Item>

                    <Form.Item label="You want this because..">
                    <Rate
                        showText={true}
                        texts={['I wish', 'I want', 'I need', 'I neeeed', 'I LOVE IT']}
                    />
                    </Form.Item>
                </Form>
            </Dialog.Body>

            <Dialog.Footer className="dialog-footer">
                <Button onClick={this.onCancel.bind(this)}>Cancelar</Button>
                <Button type="primary">Salvar</Button>
            </Dialog.Footer>
        </Dialog>;
    }
}

export default WishlistAdd;