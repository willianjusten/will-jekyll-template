---
layout: post
title: "[OpenStack][Neutron]Some notes of Alembic in Neutron"
date: 2016-09-06 17:34:57.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _oembed_1d780e72c8f245cce2b0779cc56ca996: "{{unknown}}"
  _wpcom_is_markdown: '1'
  _oembed_ad013c9ec4e0ae7296036790eb7135dd: "{{unknown}}"
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '26549865561'
  _oembed_120b964722b71ca40c589bffabd76407: "{{unknown}}"
  _oembed_9b78ea3ab7507a8b98956b3d7790f589: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>The reason why Neutron use alembic for db migration you can get reference from here with some advantages of alembic to compare to migration_repo of SqlAlchemy in Nova: <a href="https://bitbucket.org/zzzeek/alembic">https://bitbucket.org/zzzeek/alembic</a>. Someone may ask that why Nova does not move to Alembic, IMHO there might be the reason besides the advantages of Alembic that Nova has a lot db migration scripts and it probably takes a lot of time to move to alembic (and of course, it is a non-trivial job).</p>
<p>In Neutron, the db migration is executed by the help of Alembic – a db migration tool for SqlAlchemy. For more information of Alembic tutorial, I suggest to read its official documentation as below, it is well written and full details: <a href="http://alembic.zzzcomputing.com/en/latest/index.html">http://alembic.zzzcomputing.com/en/latest/index.html</a></p>
<p>There are couple things in Alembic I think we should take care about:</p>
<ol>
<li>alembic.ini file that will be stored in the working directory for Alembic configurations such as location of migration scripts, logging, etc. In Mitaka version, it is inside /neutron/db/migration directory</li>
<li>env.py will take the parameters from alembic.ini and set the working environment for alembic. It uses alembic config object to provide the access to alembic.ini. It must be stored in the directory where migration scripts are located. In Mitaka version, it is stored inside /neutron/db/migration/alembic_migration.</li>
<li>
<p>cli.py: The script that maps each of option when we run 'neutron-db-manage' into appropriate methods inside.</p>
</li>
</ol>
<p>When we want to do db migration in neutron, we trigger the command of 'neutron-db-manage' that will do nothing else just calling 'main()' function of cli.py script.</p>
<p>If you want to test with Alembic with/without Devstack enviroment, I strongly suggest the below official page of OpenStack:</p>
<p><a href="http://docs.openstack.org/developer/neutron/devref/alembic_migrations.html">http://docs.openstack.org/developer/neutron/devref/alembic_migrations.html</a></p>
<p>I have had a small test with my local Devstack environment and indeed, it was funny :d. I just created another function called “vietstack” instead of “neutron-db-manage” and did couple of db manipulations.</p>
<p>5/9/2016</p>
<p>VietStack</p>
