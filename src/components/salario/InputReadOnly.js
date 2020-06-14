import React, { Component } from 'react'
import CurrencyInput from 'react-currency-input';

export default class InputReadOnly extends Component {
    render() {
        const { descricao, valor, porcentagem, color } = this.props;
        const sufix = porcentagem > 0 ? ` (${porcentagem.replace(".",",")}%)` : '';
        return (
            <div class="input-field col s3">
                <span style={{
                    display: "block",
                    margin: "0rem 0"
                }}>
                   <label >{descricao}</label>
                </span>
                <CurrencyInput style = {{color: color}} prefix="R$ " value={valor} suffix={sufix} decimalSeparator="," thousandSeparator="." readOnly />
            </div>
        )
    }
}

