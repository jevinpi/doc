# <center>centos下mysql5.7的安装</center>
## 检查是否有安装过其他版本
```
# yum list installed | grep mysql
 mysql-libs.i686         5.1.71-1.el6      @anaconda-CentOS-201311271240.i386/6.5
# yum -y remove mysql-libs.i686
```
## 下载rpm
从mysql的官网下载mysql57-community-release-el6-5.noarch.rpm（注意这里的el6-5即适配RHEL6.5的版本，如果下载了其它版本后面的安装过程中可能会报错）
```
# wget dev.mysql.com/get/mysql-community-release-el6-5.noarch.rpm
```

##  安装上一步的下载
```
# yum install mysql-community-release-el6-5.noarch.rpm
```
安装成功后，我们可以看到/etc/yum.repos.d/目录下增加了以下两个文件
```
# ls /etc/yum.repos.d
mysql-community-source.repo
mysql-community.repo
```
查看mysql57的安装源是否可用，如不可用请自行修改配置文件（/etc/yum.repos.d/mysql-community.repo）使mysql57下面的enable=1

若有mysql其它版本的安装源可用，也请自行修改配置文件使其enable=0
```
# yum repolist enabled | grep mysql
mysql-connectors-community MySQL Connectors Community                        13
mysql-tools-community      MySQL Tools Community                             18
mysql57-community-dmr      MySQL 5.7 Community Server Development Milesto    65
```
## 使用yum安装mysql
```
yum install mysql-community-server
```
## 启动mysql服务
```
启动mysql服务
```
## 修改字符集为UTF-8
```
#vim /etc/my.cnf
在[mysqld]部分添加：
character-set-server=utf8
```
## 授权远程连接
```
# use mysql;
# grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
# flush privileges;
```