import React, { Component } from 'react';
import { calculateSalaryFrom } from './helpers/salary.js';
import Bar from "./components/salario/Bar.js";
import InputReadOnly from './components/salario/InputReadOnly.js';
import CurrencyInput from 'react-currency-input';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      salarioLiquido: 0,
      baseINSS: 0,
      descINSS: 0,
      baseIRPF: 0,
      descIRPF: 0,
      salLiq: 0,
      INSSPercent: 0,
      IRPFPercent: 0,
      netSalaryPercent: 0
    };
  }

  handleChange = (event) => {
    const valorDigitado = parseInt(event.target.value.replace(/[\D]+/g, '')) / 100;
    this.calculoSalario(valorDigitado);
  }

  calculoSalario = (valor) => {
    if (valor > 0) {
      const ret = calculateSalaryFrom(valor);
      const total = ret.discountINSS + ret.discountIRPF + ret.netSalary;
      const INSSPercent = ((ret.discountINSS / total) * 100).toFixed(2);
      const IRPFPercent = ((ret.discountIRPF / total) * 100).toFixed(2);
      const netSalaryPercent = ((ret.netSalary / total) * 100).toFixed(2);
      this.setState({
        salarioLiquido: valor,
        baseINSS: ret.baseINSS,
        descINSS: ret.discountINSS,
        baseIRPF: ret.baseIRPF,
        descIRPF: ret.discountIRPF,
        salLiq: ret.netSalary,
        INSSPercent: INSSPercent,
        IRPFPercent: IRPFPercent,
        netSalaryPercent: netSalaryPercent
      });
    } else {
      this.setState({
        salarioLiquido: valor,
        baseINSS: 0,
        descINSS: 0,
        baseIRPF: 0,
        descIRPF: 0,
        salLiq: 0,
        INSSPercent: 0,
        IRPFPercent: 0,
        netSalaryPercent: 0
      });
    }
  };

  render() {

    const { salarioLiquido, baseINSS, descINSS, baseIRPF, descIRPF, salLiq, INSSPercent, IRPFPercent, netSalaryPercent } = this.state;
    return (
      <div>
        <div class="container">
          <h3 class="center">Cálculo Salário Líquido</h3>
          <form class="col s12">
            <div class="input-field col s3">
              <span style={{
                display: "block",
                margin: "0rem 0"
              }}>
                <label >Salário Bruto</label>
              </span>
              <CurrencyInput prefix="R$ " value={salarioLiquido} decimalSeparator="," thousandSeparator="." onBlur={this.handleChange} />
            </div>
            <div class="row">
              <InputReadOnly descricao="Base INSS" valor={baseINSS} />
              <InputReadOnly descricao="Desconto INSS" valor={descINSS} porcentagem={INSSPercent} color="#e67e22" />
              <InputReadOnly descricao="Desconto IRPF" valor={baseIRPF} />
              <InputReadOnly descricao="Desconto IRPF" valor={descIRPF} porcentagem={IRPFPercent} color="#c0392b" />
            </div>
            <div class="row">
              <InputReadOnly descricao="Salário Líquido" valor={salLiq} porcentagem={netSalaryPercent} color="#16a085" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }} >
              <Bar value={INSSPercent} color="#e67e22" />
              <Bar value={IRPFPercent} color="#c0392b" />
              <Bar value={netSalaryPercent} color="#16a085" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

