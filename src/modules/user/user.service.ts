import { Injectable } from "@/common";

/**
 * 用户接口
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * 用户服务
 */
@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: "张三", email: "zhangsan@example.com" },
    { id: 2, name: "李四", email: "lisi@example.com" },
    { id: 3, name: "王五", email: "wangwu@example.com" },
  ];

  /**
   * 获取所有用户
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * 根据 ID 获取用户
   * @param id 用户ID
   */
  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  /**
   * 创建用户
   * @param userData 用户数据
   */
  create(userData: Omit<User, "id">): User {
    const newUser: User = {
      id: Math.max(...this.users.map((u) => u.id)) + 1,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * 更新用户
   * @param id 用户ID
   * @param userData 更新的用户数据
   */
  update(id: number, userData: Partial<Omit<User, "id">>): User | null {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    const updatedUser = { ...this.users[userIndex], ...userData } as User;
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  /**
   * 删除用户
   * @param id 用户ID
   */
  delete(id: number): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}
