import { Plan } from "../../types/Plan";

const plans: Plan[] = [
    { id: '1', name: 'TypeScript', description: 'Learn TypeScript', planDate: new Date() },
    { id: '2', name: 'React', description: 'Learn React', planDate: new Date() },
    { id: '3', name: 'Algorithms', description: 'Learn Algorithms', planDate: new Date() }
]

function getLastItem<T>(params:T[]): T {
    return params[params.length - 1];
}

function addToItems<T>(item: T, items: T[]): T[] {
    return [...items, item];
}

const PlanComponent: React.FC = () => {
    return (
        <div>
            <div className="card p-4">
                <h2>Plans</h2>
                <ul className="list-group">
                    {plans.map((plan) => (
                        <li key={plan.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{plan.name}</strong>
                                {plan.description && (
                                    <span className="text-muted d-block">Description: {plan.description}</span>
                                )}
                                {plan.planDate && (
                                    <span className="text-muted d-block">
                                        Date & Time:
                                        {new Date(plan.planDate).toLocaleDateString()}
                                        {new Date(plan.planDate).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => {
                        const newPlan: Plan = {
                            id: (parseInt(getLastItem(plans).id) + 1).toString(),
                            name: 'New Plan',
                            description: 'Description',
                            planDate: new Date()
                        }
                        console.log(newPlan)
                        console.log(addToItems<Plan>(newPlan, plans))
                    }}
                    className="btn btn-primary mt-4"
                >
                    Add Plan
                </button>
            </div>


        </div>
    );
};

export default PlanComponent;