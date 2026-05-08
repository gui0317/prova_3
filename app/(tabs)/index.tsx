import { useExpenses } from '@/context/ExpensesContext';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { expenses, removeExpense, getTotal } = useExpenses();
  const total = getTotal();

  const renderItem = ({ item }: { item: { id: string; description: string; value: number } }) => (
    <View style={styles.expenseItem}>
      <View>
        <Text style={styles.expenseDescription}>{item.description}</Text>
        <Text style={styles.expenseValue}>R$ {item.value.toFixed(2)}</Text>
      </View>
      <Pressable style={styles.deleteButton} onPress={() => removeExpense(item.id)}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de gastos</Text>
      <Text style={styles.total}>Total gasto: R$ {total.toFixed(2)}</Text>

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={expenses.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum gasto cadastrado.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  total: {
    fontSize: 14,
    marginBottom: 10,
  },
  expenseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseDescription: {
    fontSize: 14,
  },
  expenseValue: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#999',
  },
});
