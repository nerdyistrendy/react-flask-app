"""empty message

Revision ID: 6e4d0231e807
Revises: 
Create Date: 2021-02-15 01:56:20.016590

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e4d0231e807'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('investment_properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('address', sa.Text(), nullable=True),
    sa.Column('price', sa.Text(), nullable=True),
    sa.Column('property_id', sa.Text(), nullable=True),
    sa.Column('details_str', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('investors',
    sa.Column('id', sa.Text(), nullable=False),
    sa.Column('name', sa.Text(), nullable=True),
    sa.Column('profile_pic', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('investment_lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('list_name', sa.Text(), nullable=True),
    sa.Column('investor_id', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['investor_id'], ['investors.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('investor_properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('capRatio', sa.Float(), nullable=True),
    sa.Column('note', sa.Text(), nullable=True),
    sa.Column('investor_id', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['investor_id'], ['investors.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('association',
    sa.Column('investment_lists_id', sa.Integer(), nullable=False),
    sa.Column('investment_properties_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['investment_lists_id'], ['investment_lists.id'], ),
    sa.ForeignKeyConstraint(['investment_properties_id'], ['investment_properties.id'], ),
    sa.PrimaryKeyConstraint('investment_lists_id', 'investment_properties_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('association')
    op.drop_table('investor_properties')
    op.drop_table('investment_lists')
    op.drop_table('investors')
    op.drop_table('investment_properties')
    # ### end Alembic commands ###
