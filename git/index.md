# 代码提交

提交到仓库
git commit -m [message]
git commit - a 直接提交到仓库去
git commit -v 提交时显示所有 diff 信息
git commit --amend -m [message] 替代上一次提交
git commit --amend -m [file11] [file2] ... 重做上一次的 commit 并包括指定文件

git status
git log
git log --stat

# 分支

git branch 列出本地所有的分支
git branch -r 列出本远程所有的分支
git branch -a 列出本地和远程所有的分支
git branch [barnch-name] 创建一个分支
git checkout - b [branch-name] 创建一个分支并且跳转到对应的分支

# 部署

1.创建一个远程仓库
2.settings/pages
github pages
Soucre 选择 master 分支的跟文件

配置：
git config --global user.name "wuli"
git config --global user.email "1477515364@qq.com"

查看当前文件夹 git 的状态
git status
初始化 git
git init
