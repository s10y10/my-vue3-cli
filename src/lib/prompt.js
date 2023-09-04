import inquirer from 'inquirer';

// 通过交互获取用户选择的模板类型
async function getTplType(message = '请选择要创建的项目前端框架') {
  const { tplType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tplType',
      message,
      choices: [
        {
          name: 'vue',
          value: 'vue',
        },
        {
          name: 'react',
          value: 'react',
        },
      ],
    },
  ]);
  return tplType;
}

export const prompt = {
  getTplType,
};
