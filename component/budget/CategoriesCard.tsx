import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useSelector } from 'react-redux';
import categories from '../../helpers/categories';
import { RootState } from '../../redux/store';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9A9A9A',
  },
  textContent: {
    fontSize: 14,
    color: '#9A9A9A',
  },
  circle: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15 / 2,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  budgetUse: {
    fontSize: 30,
    color: '#D4473B',
    marginVertical: 10,
  },
});

interface GraphElement {
  x: string,
  y: number
}

const CategoriesCard = (): JSX.Element => {
  const { expenses } = useSelector((state: RootState) => state.expenses);
  const [dataGraph, setDataGraph] = useState<Array<GraphElement>>([]);
  const [colorGraph, setColorGraph] = useState<Array<string>>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  function calcDataGraph() {
    const tmpGraph: GraphElement[] = [];
    const tmpColors: string[] = [];

    categories.forEach((category) => {
      let categoryExpense = 0;

      expenses.forEach((expense) => {
        if (expense.categorie === category.name) {
          categoryExpense += expense.price;
        }
      });
      const graphElem: GraphElement = {
        x: category.name,
        y: categoryExpense,
      };
      if (categoryExpense > 0) {
        tmpGraph.push(graphElem);
        tmpColors.push(category.color);
      }
    });
    setDataGraph(tmpGraph);
    setColorGraph(tmpColors);
  }

  function calcTotalExpense() {
    let tmpTotalExpense = 0;
    expenses.forEach((expense) => {
      tmpTotalExpense += expense.price;
    });
    setTotalExpense(tmpTotalExpense);
  }

  useEffect(() => {
    calcDataGraph();
    calcTotalExpense();
  }, [expenses]);

  const Pie = () => {
    if (expenses.length > 0) {
      return (
        <View style={{ alignItems: 'center' }}>
          <VictoryPie
            colorScale={colorGraph}
            innerRadius={() => 50}
            data={dataGraph}
            height={250}
          />
        </View>
      );
    }
    return <View />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Dépenses effectuées</Text>
      <Text style={styles.budgetUse}>
        {totalExpense}
        {' '}
        €
      </Text>
      {Pie()}
    </View>
  );
};

export default CategoriesCard;
