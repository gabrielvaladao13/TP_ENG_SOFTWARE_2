import UserServices from "../../database/Services/UserServices";

// Mockar o módulo AccountServices para evitar chamadas reais ao banco de dados
jest.mock("../../database/Services/AccountServices", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      deleteAccount: jest.fn(),
    })),
  };
});

test("createUser works with valid data", async () => {
  const userServices = new UserServices();
  const userData = {
    name: "Gabriela Fonseca",
    email: "gabriela@gmail.com",
    password: "gabriela123",
    age: 22,
    role: "user",
  };

  const user = await userServices.createUser(userData.name, userData.email, userData.password, userData.age, userData.role);
  expect(user).toEqual(userData);
});

test("listUsers returns a list of users", async () => {
  const userServices = new UserServices();

  const users = await userServices.listUsers();
  expect(Array.isArray(users)).toBe(true);
});

test("updateUser updates user data", async () => {
  const userServices = new UserServices();
  const userId = 1;
  const userData = {
    name: "Updated Name",
    age: 30,
  };

  const updatedUser = await userServices.updateUser(userId, userData);
  expect(updatedUser.name).toBe(userData.name);
  expect(updatedUser.age).toBe(userData.age);
});

test("deleteUser deletes user and associated accounts", async () => {
  const userServices = new UserServices();
  const userId = 1;

  // Mock accounts for the user
  const mockAccounts = [
    { id: 1, userId: userId },
    { id: 2, userId: userId },
  ];

  // Configurar o mock de AccountServices
  userServices.accountService.deleteAccount = jest.fn();

  await userServices.deleteUser(userId);

  // Check if the user and associated accounts are deleted
  expect(userServices.userRepository.deletedUserId).toBe(userId);
  expect(userServices.accountService.deleteAccount).toHaveBeenCalledWith(mockAccounts[0].id);
  expect(userServices.accountService.deleteAccount).toHaveBeenCalledWith(mockAccounts[1].id);
});