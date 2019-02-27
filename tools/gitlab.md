# <center>centos下gitlab的安装与迁移</center>
## 安装
1. 安装依赖包
   
   `yum install curl openssh-server openssh-clients postfix cronie`
2. 启动postfix服务, 并设为默认开启
 
   ```
   service postfix start
   chkconfig postfix on
   ```
3. 安装gitlab
   ```
   rpm -i gitlab-ce-8.10.2-ce.0.el6.x86_64.rpm 
   # 安装结束后初始化配置 gitlab
   gitlab-ctl reconfigure
   ```
4. 访问后发现会重定向回 http://localhost, 需要修改external_url
   ```
   vi /etc/gitlab/gitlab.rb 
   # 然后修改 external_url 'http://192.168.11.22'
   # 然后reconfigure
   gitlab-ctl reconfigure
   ```
5. 安装完成

##  备份与迁移
1. 在源系统进行备份
   ```
   gitlab-rake gitlab:backup:create
   ```
2. 找到备份文件
   找到备份文件，默认`/var/opt/gitlab/backups`
3. 停止gitlab
   ```
   gitlab-ctl stop unicorn
   gitlab-ctl stop sidekiq
   ```
4. 移动备份文件
   备份文件通过scp命令或者FTP上传至安装服务器，默认地址`/var/opt/gitlab/backups`
5. 恢复备份
   ```
   gitlab-rake gitlab:backup:restore BACKUP=backup_file_name
   backup_file_name:备份文件名称
   eg:1550814504_2019_02_22_10.0.0_gitlab_backup.tar
   gitlab-rake gitlab:backup:restore BACKUP=1510472027_2017_11_12_9.4.5
   ```
6. 重启gitlab
   
   `gitlab-ctl restart`