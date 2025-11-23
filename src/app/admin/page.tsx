export default function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Gerenciamento de Produtos</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4">Produto</th>
                            <th className="p-4">Preço</th>
                            <th className="p-4">Estoque</th>
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-4">Nike Air Zoom</td>
                            <td className="p-4">R$ 129.99</td>
                            <td className="p-4">10</td>
                            <td className="p-4 space-x-2">
                                <button className="text-blue-600 hover:underline">Editar</button>
                                <button className="text-red-600 hover:underline">Excluir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
