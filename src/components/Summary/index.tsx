import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryContainer, SummaryCard } from "./styles";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useContext } from "react";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction ) => { 
      if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0
    }
  )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#F1BF42' />
        </header>
        <strong>{summary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#F75A68' />
        </header>
        <strong>{summary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant="yellow">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#202024' />
        </header>
        <strong>{summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}